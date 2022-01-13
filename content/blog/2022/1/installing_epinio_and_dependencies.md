---
title: How we Install Dependencies for Epinio
authors:
    - Mario Manno
date: 2022-01-13
---
-------------------------------------

[Epinio] is meant to put your application on Kubernetes with one command, without any prior Kubernetes knowledge. To do that, Epinio relies on a set of well-established open-source components, like Tekton, a docker registry and [Cloud Native buildpacks].

The latest [Epinio release] comes with two helm charts, one for installing just Epinio, the other installs Epinio with all dependencies configured. Look at the [installation docs] if you want to jump right in.

## Orchestrating Application Deployment on Kubernetes

How hard it is to install a set of interdependent applications on a cluster has been troubling the Epinio developer team again and again.

This article is not about applications that users deploy with Epinio, but rather about Epinio as an application itself. Epinio’s runtime dependencies, the components, must be installed in a certain order; configuration must be applied, and you must wait for Kubernetes resources to be ready and usable. For example, pods serving admission webhooks must be up and running, SSL certificates must have been generated, etc.

Managing complex deployments is the domain of software provisioning tools like Ansible, or maybe Helmfile. Though, when using Helmfile one would have to put configuration into a separate chart and control the installation order.

> “The Epinio team ships releases, we don't manage one infrastructure, we need an installer that works with any cluster”

The latest Epinio version (0.3.x) now ships a [standalone Epinio helm chart]. All dependencies have been removed. Because, we just can't tell if Epinio is installed in an existing cluster, if components should be re-used. After all, how many cert-manager installations do you need in your production cluster? Indeed, one.

But sometimes you don't care, you're using a fresh cluster, or a local cluster (like k3s, [Rancher Desktop]). This is also the case for our CI, when we test Epinio, we spin up a cluster and deploy the standard set of components.

For that case, we have another chart, the [Epinio installer chart]. The new installer, used in that chart, takes a manifest and deploys all listed dependencies.

While the installer is kept simple on purpose, as we consider it more of an internal tool, it can update existing deployments.

It also doesn't take ownership of the components. Most dependencies are helm charts. When problems arise, like temporary download errors, these can be fixed with helm directly. E.g., by doing a `helm rollback`.

Previously you had to uninstall first, then re-install all dependencies, now you can just run the installer again, as it's much more idempotent.

## Use case: Faster Installation on Rancher Desktop

If you're deploying Epinio in RD, you might want to skip Linkerd. There is not much reason to add SSL to localhost traffic on a desktop machine.

```
helm upgrade --install -n epinio --create-namespace --set "skipLinkerd=true" epinio-installer https://github.com/epinio/helm-charts/releases/download/epinio-installer-0.3.4/epinio-installer-0.3.4.tgz
```

With the new installation methods, Epinio gained lots of flexibility. It’s easier for the team to test different components. For example, we're looking forward to trying Nginx instead of Traefik as an ingress. Maybe, all we have to do is switch the manifest to Nginx, without recompiling!?

[Epinio]:
https://epinio.io/
[Cloud Native Buildpacks]:
https://buildpacks.io/
[installation docs]:
https://docs.epinio.io/installation/installation.html
[Epinio release]:
https://github.com/epinio/epinio/releases
[standalone Epinio helm chart]:
https://artifacthub.io/packages/helm/epinio/epinio
[Epinio installer chart]:
https://artifacthub.io/packages/helm/epinio/epinio-installer
[Rancher Desktop]:
https://rancherdesktop.io/
