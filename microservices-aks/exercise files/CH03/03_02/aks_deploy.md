# Create a resource group and location variable

resource_group=aks-rg
location=eastus

# For our virtual network, let’s define the following variables
vnet_name=aks-vnet
vnet_address_prefix=10.0.0.0/8
subnet_name=aks-subnet
vnet_subnet_prefix=10.240.0.0/16

# For our AKS resource, we have to define the following variables
aks_cluster_name=aks-cluster-01
aks_control_plane_userid=$aks_cluster_name-usermsi
aks_service_cidr=10.2.0.0/24
aks_dns_service_ip=10.2.0.10


# Create a resource group
az group create -g $resource_group -l $location


# Creates a virtual network:
az network vnet create --resource-group $resource_group --location $location --name $vnet_name --address-prefixes $vnet_address_prefix --subnet-name $subnet_name --subnet-prefixes $vnet_subnet_prefix


# retrieve subnetID
subnet_id=$(az network vnet subnet show --resource-group $resource_group --vnet-name $vnet_name --name $subnet_name --query id -o tsv)

# get aks version that's not a preview version
aks_version=$(az aks get-versions --location $location --query 'orchestrators[?!isPreview] | [-1].orchestratorVersion'  --output tsv)


# create a user managed identity before cluster creation
az identity create --resource-group $resource_group --name $aks_control_plane_userid


# Retrieve service principal ID of the user-assigned identity and assign to a variable - sp_id
sp_id=$(az identity show --resource-group $resource_group --name $aks_control_plane_userid --query principalId --output tsv)


# Retrieve the unique ID of the user-assigned identity and assign to variable named resourceID
resource_id=$(az identity show --resource-group $resource_group --name $aks_control_plane_userid --query id --output tsv)

# Create a role assignment with the retrieved details
az role assignment create --assignee-object-id $sp_id --role "Managed Identity Operator" --scope $resource_id --assignee-principal-type ServicePrincipal


# Deploy AKS Cluster:
az aks create -g $resource_group -n $aks_cluster_name --vm-set-type VirtualMachineScaleSets --node-count 3 --location $location --kubernetes-version $aks_version --network-plugin azure --vnet-subnet-id $subnet_id --service-cidr $aks_service_cidr --dns-service-ip $aks_dns_service_ip --docker-bridge-address 172.17.0.1/16 --max-pods 100 --generate-ssh-keys --enable-managed-identity --assign-identity $resource_id --assign-kubelet-identity $resource_id


# Authenticate to the AKS cluster:
az aks get-credentials --resource-group $resource_group --name $aks_cluster_name


# Confirm number of nodes and successful deployment of AKS 
kubectl get nodes