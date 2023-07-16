# Three-tier Architecture Implemention Of Wordpress Web Solution

Generally, web, or mobile solutions are implemented based on what is called the Three-tier Architecture.

Three-tier Architecture is a client-server software architecture pattern that comprise of 3 separate layers.

Your 3-Tier Setup

- A Laptop or PC to serve as a client
- An EC2 Linux Server as a web server (This is where you will install WordPress)
- An EC2 Linux server as a database (DB) serve

## Create a new managed disk

The managed disk will be used as data disk for the virtual machine.

![Machine Disk](./images/managed-disk.png)

## Create an AWS instance using Ubuntu Distribution

The EC2 instance will serve as a Web Server, create 2 disk in the same AZ as the Web Srver EC2, each of 16GB.

![Virtual Machines](./Images/vm.png)

- ssh into the Web Server

Use 

```bash
lsblk
``` 
