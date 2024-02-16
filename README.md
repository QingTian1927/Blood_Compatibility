Quynhbio's Interactive Blood Compatibility Checker
==================================================

An interactive tool to learn about basic blood type compatibility, for educational purposes only.

This website was originally created at the request of my mother. Since this is a hobbyist project in nature, it is very basic in terms of features. Nevertheless, designing the entire website from scratch was a very valuable learning experience to myself.

# Technology

Although it is possible, and perhaps even recommended, to build the website using popular frameworks such as React, Vue or Svelt, I've decided to prioritize simplicity and accessibility.

## On the client side:

**Plain HTML, CSS and JavaScript:** This classic trio forms the foundation for the website's user interface and interactive features, ensuring compatibility across various devices and browsers. Given the relatively small scale of the project, this technology stack achieves the educational goals effectively.

## On the server side:

Since the website pretty much behaves similarly to a static site, there is no need for complex server-side logic. Thus, I've decided to set up a simple server using the following technologies:

* **Node.js:** This popular JavaScript runtime environment efficiently handles server-side operations.

* **Express:** This lightweight framework provides a structured approach to building the Node.js server, ensuring efficient organization and scalability.

* **Compression:** This library optimizes data transfer, resulting in faster loading times and a smoother user experience.

# Running From Source

Running Quynhbio's Interactive Blood Compatibility Checker from source is a relatively straightforward process as there is no compilation step involved.

To run the website from source, please make sure to download and install the following dependencies first:

* `node` >= `20.10.0`
* `compression` >= `1.7.4`
* `express` >= `4.18.2`

## Linux

To get started on Linux, first download Node.js using your package manager of choice. Please note that the exact package name may differ across distributions.

**Fedora**
``` sh
dnf install nodejs
```

**Debian**
``` sh
apt install nodejs
```

**Arch:**
``` sh
pacman -S nodejs-lts-iron
```

Next, clone the GitHub repository onto your system.
``` sh
git clone https://github.com/QingTian1927/Quynhbio-s-Interactive-Blood-Compatibility-Checker
```

Afterwards, `cd` to the cloned directory and install `npm` dependencies.
```
npm install
```

If `npm` successfully sets up the Node.js environment, simply launch the server with the following command:
```
node server.js
```

You should see the following message if everything goes well:
```
[2024-02-16T04:32:12.318Z] Blood Compatibility listening on port {<PORT NUMBER>}
```

where `<PORT NUMBER>` could be any number such as `4242` or `10000`.





