# Get AKS Server URL via Azure CLI
kubectl config view --minify -o jsonpath={.clusters[0].cluster.server}

# Create SA in AKS cluster
kubectl create serviceaccount aksdemo-release-sp

# Manually create a secret for the SA
kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
  name: aksdemo-release-sp
  annotations:
    kubernetes.io/service-account.name: aksdemo-release-sp
EOF

# Create a role binding for the SA
kubectl create clusterrolebinding aksdemo-release-sp --clusterrole=cluster-admin --serviceaccount=default:aksdemo-release-sp

# Get yaml output for the Secret
kubectl get secret aksdemo-release-sp -o yaml