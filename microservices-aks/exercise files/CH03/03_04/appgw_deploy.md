# First, let’s define the following variables as we did in an earlier video. Note that if your previous session expired, you may have to redefine earlier variables again, like the resource group, location, vnet_name
appgw_subnet=appgw-subnet-001
appgw_public_ip_name=appgwPublicIP
appgw_name=appgw-01
appgw_subnet_prefix=10.241.0.0/24

# Create a standard public IP resource:
az network public-ip create -n $appgw_public_ip_name -g $resource_group --allocation-method Static --sku Standard

# Create a subnet in our existing virtual network for the application gateway:
az network vnet subnet create --name $appgw_subnet --vnet-name $vnet_name --resource-group $resource_group --address-prefixes $appgw_subnet_prefix

# Create an application gateway in that subnet and link the publicIP resource:
az network application-gateway create -n $appgw_name -l $location -g $resource_group --sku Standard_v2 --public-ip-address $appgw_public_ip_name --vnet-name $vnet_name --subnet $appgw_subnet --priority 19000

# Retrieve the app gateway ID into a variable for reference
appgwId=$(az network application-gateway show -n $appgw_name -g $resource_group -o tsv --query "id")

# Enable the AGIC add-on in the cluster to use the application gateway we’ve just created:
az aks enable-addons -n $aks_cluster_name -g $resource_group -a ingress-appgw --appgw-id $appgwId

# If your az aks enable add-on command failed due to authentication issues, simply run the get-credentials command again: 
az aks get-credentials -n myCluster -g myResourceGroup
# then re-run the enable-addon command.