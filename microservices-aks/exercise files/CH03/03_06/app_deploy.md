# Check you still have ui container image from earlier task
docker images

# Connect to Azure
az login

# Login to ACR
az acr login --name <acrName>

# Get ACR server address
az acr list --resource-group aks-rg --query "[].{acrLoginServer:loginServer}" --output table

# Tag the local copy of the UI Container Image
docker tag ui:v1.0 acr28063.azurecr.io/ui:v1.0

# Confirm new UI image with acr tag exist
docker images | grep ui -w

# Push image to ACR
docker push <acrLoginServer>/ui:v1.0

# Verify the image is in ACR
az acr repository list --name <acrName> --output table

# Connect to AKS
az aks get-credentials --resource-group <resourceGroupName> --name <AKSClusterName>

# Verify that you are connected
kubectl get nodes

# Apply UI Manifest to the AKS cluster
kubectl apply -f demo-ui.yaml

# Verify pod is deployed for UI
kubectl get pods -n ns-posthub--env

# See every related pod/service/deployment etc in this namespace
kubectl get all -n ns-posthub--env

# Describe a UI pod
kubectl describe pod <uiPodName> -n ns-posthub--env

