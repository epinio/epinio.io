---
title: Epinio v0.2.0 Release
authors:
    - Epinio Team
date: 2021-11-19
---
-------------------------------------

The new [Epinio v0.2.0](https://github.com/epinio/epinio/releases) is out and marks an important milestone.

This release adds Epinio to the Rancher UI's dashboard, but that is not the only big change. A lot more features were added in the last nine weeks.

A future blog post might talk more about the new UI, but in short, once you installed Epinio on your cluster, it shows up automatically in Rancher's web interface. Then you can upload your apps sources and they'll be automatically deployed. More information can be found in the [Epinio UI installation instructions](https://github.com/epinio/ui/blob/beta2/README.md).

This was possible due to a redesign of the Epinio API server, which also makes it easier to manage multiple users.

Under the hood, Epinio became more modular and can optionally use existing S3 storage and container registries.
Gitea was removed, but Epinio can still deploy apps from a Git source, and Linkerd is optional now.

The service catalog component is no longer maintained by upstream, so Epinio services are now just secrets, containing the service's connection details, that are provided to the workloads. In contrast to the env var feature, the service secrets can be shared between applications.

This release was tested with more public, private and local cluster offerings. You can find the growing list in the [installation docs](https://docs.epinio.io/installation/installation.html#installation-on-specific-kubernetes-offerings).
Epinio 0.2.0 also comes with a [Helm chart](https://artifacthub.io/packages/helm/epinio/epinio) that supports the integration into Rancher.


Several improvements were implemented regarding the application workloads:
* Workloads can now be deployed with a manifest. The manifest can also be generated from an existing workload.
* Application health is reported in more detail.
* Workloads were previously limited to the system domain, now different domains per workload are possible and path-based routing is supported.
