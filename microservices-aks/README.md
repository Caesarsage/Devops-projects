# Azure Kubernetes Service (AKS): Deploying Microservices
This is the repository for the LinkedIn Learning course Azure Kubernetes Service (AKS): Deploying Microservices. The full course is available from [LinkedIn Learning][lil-course-url].

As a devops engineer, developer, cloud admin, or system admin, you may need to deploy production AKS clusters and microservices via an orchestrator (AKS). This course has you covered. Instructor Prince Mokut introduces the basics of packaging microservices into images that can be deployed locally as a standalone docker container or in Azure Kubernetes, a cloud-managed orchestrator that helps you manage multiple container resources. Prince guides you through the process of securing access to your Azure Kubernetes Cluster, as well as the microservices in a production environment. He explains how to use CI/CD pipelines to automate deployment, as this helps you manage deployments of several applications. At the end of the course, you will know how to deploy a secure AKS integrated with Azure Application Gateway to securely expose your APIs, as well as how to fully automate deployment processes of container images for your development team.

## Instructions
This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go to the branch you want to access.

## Branches
The branches are structured to correspond to the videos in the course. The naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03` corresponds to the second chapter and the third video in that chapter. 
Some branches will have a beginning and an end state. These are marked with the letters `b` for "beginning" and `e` for "end". The `b` branch contains the code as it is at the beginning of the movie. The `e` branch contains the code as it is at the end of the movie. The `main` branch holds the final state of the code when in the course.

When switching from one exercise files branch to the next after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:
	
    Add changes to git using this command: git add .
	Commit changes using this command: git commit -m "some message"


### Instructor

Prince Mokut 
                            
DevOps Expert/Site Reliability Engineer

                            

Check out my other courses on [LinkedIn Learning](https://www.linkedin.com/learning/instructors/prince-mokut).

[lil-course-url]: https://www.linkedin.com/learning/azure-kubernetes-service-aks-deploying-microservices?dApp=59033956
[lil-thumbnail-url]: https://cdn.lynda.com/course/3212145/1666809303090?e=2147483647&v=beta&t=0nqhoXz1GKi8gQf-bpv7AkZlfrOtrgTyx3KfoFG4RDA-16x9.jpg
