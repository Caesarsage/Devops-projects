# Random name variable for ACR
acr_name=acr$RANDOM

# Create ACR
az acr create --resource-group $resource_group --location $location --name $acr_name --sku Standard

# Update aks to integrate with acr
az aks update --name $aks_cluster_name --resource-group $resource_group --attach-acr $acr_name

# If az aks update command fails to run, ensure to first run the “az aks get-credentials” then rerun the update the cluster.
az aks get-credentials --resource-group $resource_group --name $aks_cluster_name
