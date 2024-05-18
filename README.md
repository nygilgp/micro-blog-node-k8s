# Microservices built with Node, React, Docker and Kubernetes

A <b>monolith contains </b>Routing, Middleware, Business Logic, Database Access to implement <b>all features</b> of our app.

A <b>single microservice contains </b>Routing, Middleware, Business Logic, Database Access to implement <b>one features</b> of our app.

Data management between services. This is a big problem in microservices. With microservices, we store and retreive data in a strange way.

1.  Each service gets its own databse(if it needs one).
2.  Service will never ever reach into another service databse.

Why database per service?

1.  Each service to run independently of other service
2.  Database schema/structure may change unexpectedly.
3.  Some service might function more efficiently with diff type of DBs(sql vs NoSql)

Communication Stratergies between services

1. Sync => Services communicate with each other using <b>direct request</b>
   Upside

   1. Conceptualy easy to understand
   2. Service won't need a DB
      Downside
   3. Introduces dependency bewteen services
   4. If any inter service request fails, the overall request fails
   5. The entire request is only fast as the slowest request
   6. Can easily introduce a web of requests

2. Async => Services communicate with each other using <b>events</b>
   Upside
   1. Service has zero dependency on other services
   2. Service will be very fast
      Downside
   3. Data duplication. Pay for extra storage + extra DB
   4. Harder to understand

# Docker

> docker build .
> docker build -t dockerid/posts .
> docker run dockerid/posts
> docker run -it dockerid/posts [cmd]

cmd can be sh for running shell command in the container

> docker ps
> docker exec -it [container id] [cmd]
> docker logs [container id]

Push image to docker

> docker push dockerid/posts

# Kubernetes

Kubernetes cluster => A collection of nodes + a master to manage them
Node => A VM that will run container
Pod => More or less a running container.(A pod can run multiple containers)
Deployment => Monitors a set of pods, make sure they are running & restart them if they crash
Service => Provide easy to remember url to access a running container

> kubectl version
> kubectl apply -f posts.yaml
> kubectl get pods

> kubectl get pods
> kubectl exec -it [pod name] [cmd]
> kubectl logs [pod name]
> kubectl delete pod [pod name]
> kubectl apply -f [config filename]
> kubectl describe pod [pod name]

## Deployments

> kubectl get deployments
> kubectl describe deployment [deployment name]
> kubectl delete deployment [deployment name]

> kubectl rollout restart deployment [deployment name]

## Services

1.  Cluster IP:
    Sets up easy to use URL to access pod. Only exposes pods in cluster.
2.  Node Port:
    Makes a pods accessible outside of the cluster. Only used in dev.
3.  Load Balancer:
    Makes pods accessible outside of the cluster, right way of doing it.
4.  External Name:
    Redirects an in-cluster request to a CNAME url

> kubectl get services

### Load Balancer

Tells kubernetes to reach out to its providers and provision a load balancer. Get traffic into a single pod.

Ingress or Ingress controller:
A pod with a set of routing rules to distribute traffic to other services.

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml
