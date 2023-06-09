# LEMP STACK IMPLEMENTATION

- L - Linux
- E - Nginx
- M - MySQL
- P - PHP

## Documentation

We will be using Ubuntu Virtual Machine through AZURE.

![Ubuntu VM](./images/vm.png)

After creating the VM, Login and we will be using the following commands to update the VM

```bash
sudo apt update
sudo apt upgrade
```

### Installing Nginx

Nginx is a simple web server that is very popular. It is often used to serve PHP applications, but it can also serve static HTML content.

Then we will be installing the following packages

```bash
sudo apt install nginx
```

* The nginx package installs Nginx and the default configuration is to run Nginx as a daemon. Once the nginx package finishes installing, you can go to your server’s IP address in your browser and see the default Nginx landing page.

Then check the status of the nginx service

```bash
sudo systemctl status nginx
```
![nginx status](./images/ngnix-status.png)

This will show you the status of the nginx service. If it is not running, you can start it with this command:

```bash
sudo systemctl start nginx
```

You could also use `curl` to check if the nginx service is running

```bash
curl http://localhost:80
```

This display the nginx default page in the terminal as text.


