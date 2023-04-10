# Add jetstack helm repository
helm repo add jetstack https://charts.jetstack.io

# Update the cluster’s helm repository cache
helm repo update

# Create a namespace - cert-manager - and install cert-manager add-on with the necessary custom resources:
helm install cert-manager jetstack/cert-manager --namespace cert-manager --set installCRDs=true --create-namespace --version v1.8.0

# Verify that cert-manager is installed
kubectl get pods --namespace cert-manager

# Create an Issuer resource
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
  namespace: cert-manager
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email: validemail@emaildomain.com # IMPORTANT: Replace with a valid email
    privateKeySecretRef:
      name: letsencrypt-staging
    solvers:
    - http01:
        ingress:
          class: azure/application-gateway
EOF
