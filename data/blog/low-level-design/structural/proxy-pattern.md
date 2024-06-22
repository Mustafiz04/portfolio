---
title: 'Proxy Pattern'
date: '2024-04-12'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Structural Design Pattern']
draft: false
summary: 'Enhance security and control access with the Proxy Pattern.'
authors: ['default']
type: 'Blog'
images: []
---

The Proxy Pattern is a structural design pattern in which one object acts as a surrogate or placeholder for another, controlling access to it. It serves as an intermediate, providing additional functionality when accessing an object while retaining the same interface as the original object.

## Current Problem

In software development, there are times when direct access to an object is neither desirable or practicable. This could be due to access control requirements, resource limits, or the necessity for extra functionality like logging, caching, or validation.

## Solution through Proxy Pattern

The Proxy Pattern solves this problem by creating a proxy object that serves as a substitute for the original object. The proxy manages access to the original object, allowing it to intercept requests and conduct additional actions before sending them to the actual object. This enables the implementation of a variety of functions, including access control, caching, logging, and lazy initialization.

## Real-World Applications

Consider a scenario in which you need to access sensitive data on a remote server. Instead of directly accessing the server, you use a proxy server to validate your credentials before sending your request to the remote server. The proxy server functions as a surrogate, adding an extra layer of protection and access control.

## Structure

The Proxy Pattern is often made up of the following components:

1. **Subject Interface**: Defines the common interface for both the real object and its proxy.
2. **Real Subject**: Represents the real object that the proxy controls access to.
3. **Proxy**: Acts as a surrogate for the real object, providing additional functionality and controlling access to it.

## Real-World Example with Code Snippet

Let's illustrate the Proxy Pattern with a simplified example of a proxy controlling access to a sensitive resource:

```Java
// Subject interface
interface Resource {
    void access();
}

// Real subject
class RealResource implements Resource {
    @Override
    public void access() {
        System.out.println("Accessing the sensitive resource...");
    }
}

// Proxy
class ProxyResource implements Resource {
    private RealResource realResource;
    private String username;
    private String password;

    ProxyResource(String username, String password) {
        this.username = username;
        this.password = password;
    }

    private void authenticate() {
        // Perform authentication logic
        // For simplicity, we'll just print a message
        System.out.println("Authenticating user: " + username);
    }

    @Override
    public void access() {
        authenticate();
        if (realResource == null) {
            realResource = new RealResource();
        }
        realResource.access();
    }
}
```

```Java
// Client code
public class Main {
    public static void main(String[] args) {
        Resource proxy = new ProxyResource("user123", "password123");
        proxy.access();
    }
}
```

## Pros and cons

### Pros:

1. **Controlled Access**: Enables controlled access to the real object, allowing for additional functionalities such as authentication, caching, or logging.
2. **Security**: Adds an extra layer of security by providing access control mechanisms.
3. **Resource Management**: Allows for lazy initialization or deferred loading of resources, improving resource management.

### Cons:

1. **Overhead**: Introducing a proxy may introduce additional overhead due to the extra layer of indirection.
2. **Complexity**: Can increase code complexity, especially when implementing additional functionalities in the proxy.

## Conclusion

The Proxy Pattern is a flexible and effective technique for restricting access to things and adding new features while retaining the original object's interface. It is especially beneficial in situations where access control, security, or resource management are critical.
