---
title: 'Template Method Pattern'
date: '2024-06-18'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Behavioral Design Pattern']
draft: false
summary: 'Template Method Pattern: Defining the algorithms skeleton while allowing step-specific customization.'
authors: ['default']
type: 'Blog'
images: []
---

The Template Method pattern is a behavioural design pattern that assigns some of the work to subclasses while defining the general structure of an algorithm in a method. Subclasses can rewrite certain algorithmic steps thanks to this pattern, which keeps the algorithm's structure intact. In situations where an algorithm has a fixed structure but variable stages, the Template Method pattern comes in handy.

## Current Problem

There are procedures or algorithms that adhere to a standard set of stages in many applications, but some parts require customisation. Because each variant of the method might reimplement the common phases, implementing these algorithms directly within classes may result in duplicated code. This strategy could lead to inconsistent results and more maintenance work.

## Solution through Template Method Pattern

By establishing a template method in a base class that describes the structure of the algorithm, the Template Method pattern addresses these problems. Other methods, some of which may be abstract or have default implementations, are called by this method. Subclasses can override these methods to give particular behaviour for certain algorithmic phases, guaranteeing consistency in the overall structure while enabling customisation.

## Real-World Applications

Consider a deployment system where different types of applications (e.g., web, Android, iOS) need to be deployed following a similar process but with variations in specific steps.

1. **Common Steps**: The overall process of deploying an application (e.g., initialize, build, test, deploy) is defined in a template method.
2. **Customizable Steps**: Specific steps, such as building and testing, can be customized by subclasses for different types of applications.
3. **Consistency**: The structure of the deployment process remains consistent across different types of applications.

## Structure

The Template Method pattern typically includes the following components:

1. **AbstractClass**: Defines the template method and declares abstract or virtual methods that subclasses will override to provide specific behavior.
2. **ConcreteClass**: Implements the abstract methods to provide specific behavior for certain steps of the algorithm.

## Real-World Example with Code Snippet

Let's implement an example where a deployment system uses the Template Method pattern to manage the deployment of different types of applications:

```Java
// AbstractClass
abstract class Deployment {
    // Template method
    public final void deployApplication() {
        initialize();
        build();
        test();
        deploy();
    }

    // Steps to be implemented by subclasses
    protected abstract void build();
    protected abstract void test();

    // Common steps with default implementations
    protected void initialize() {
        System.out.println("Initializing the deployment...");
    }

    protected void deploy() {
        System.out.println("Deploying the application...");
    }
}

// ConcreteClass for Web Deployment
class WebDeployment extends Deployment {
    @Override
    protected void build() {
        System.out.println("Building the web application...");
    }

    @Override
    protected void test() {
        System.out.println("Testing the web application...");
    }
}

// ConcreteClass for Android Deployment
class AndroidDeployment extends Deployment {
    @Override
    protected void build() {
        System.out.println("Building the Android application...");
    }

    @Override
    protected void test() {
        System.out.println("Testing the Android application...");
    }
}

// ConcreteClass for iOS Deployment
class IOSDeployment extends Deployment {
    @Override
    protected void build() {
        System.out.println("Building the iOS application...");
    }

    @Override
    protected void test() {
        System.out.println("Testing the iOS application...");
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        Deployment webDeployment = new WebDeployment();
        webDeployment.deployApplication();

        Deployment androidDeployment = new AndroidDeployment();
        androidDeployment.deployApplication();

        Deployment iosDeployment = new IOSDeployment();
        iosDeployment.deployApplication();
    }
}
```

## Pros and cons

### Pros:

1. Promotes code reuse by defining common steps in the base class.
2. Enhances consistency across different implementations of the algorithm.
3. Facilitates maintenance by centralizing the common structure of the algorithm.
4. Supports the Open/Closed Principle by allowing new behavior through subclassing.

### Cons:

1. Can lead to an inflexible design if the algorithm needs to change frequently.
2. Requires careful design to ensure that the template method and hook methods are appropriately defined.
3. Subclassing can increase the complexity of the system, especially if there are many variations.

## Conclusion

A strong framework for developing algorithms with a set structure but programmable phases is offered by the Template Method pattern. The design encourages code reuse, consistency, and maintainability by encapsulating the common structure in a base class and enabling subclasses to override certain phases. The Template Method pattern is a useful technique in software design because it provides a reusable, well-defined algorithmic structure, even in the face of possible inflexibility and complexity.