---
title: 'Decorator Pattern'
date: '2024-03-15'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Structural Design Pattern']
draft: false
summary: 'Flexible Extensions: Empowering Objects with the Decorator Pattern.'
authors: ['default']
type: 'Blog'
images: []
---

The Decorator Pattern is a structural design pattern that allows behaviour to be added to specific objects, either statically or dynamically, while preserving the behaviour of other objects in the same class. This pattern offers a more flexible alternative to subclassing for adding functionality.

## Current Problem

Subclassing is a common technique used in object-oriented design to extend an object's capabilities. However, subclassing creates rigidity because it is static and applies to the entire class rather to individual objects. It can result in a proliferation of subclasses, making a system too complex and difficult to understand, particularly when adding various functionalities.

## Solution through Decorator Pattern

The Decorator Pattern addresses these concerns by allowing additional functionality to be added to objects without inheriting from them. It accomplishes this by defining a collection of decorator classes that are used to surround concrete components. This technique allows you to dynamically and transparently add responsibilities to objects without changing their code.

## Real-World Applications

1. **Graphical User Interface (GUI) Toolkits**: Add more functionality to visual components such as borders, scrolling, and colour changes without changing the components themselves.
2. **Data Stream Enhancements**: Adding functions like buffering, compression, or encryption to data streams without altering the underlying data source or the stream's essential functionality.
3. **Middleware Services**: Flexible and modular enhancements to service objects in middleware, such as logging, transaction management, or error handling.

## Structure

The Decorator Pattern typically involves the following components:

1. **Component** is an interface for objects that can be dynamically assigned responsibilities.
2. **ConcreteComponent**: A concrete implementation of the Component that defines an object to which extra responsibilities can be assigned.
3. **Decorator**: An abstract class that implements the Component interface and stores a reference to a Component instance.
4. **ConcreteDecorator**: A concrete version of the Decorator that adds duties to the component.

## Real-World Example with Code Snippet

Imagine a simple coffee shop application where you can add different ingredients to the base coffee:

```Java
// Component
interface Coffee {
    double cost();
    String description();
}

// ConcreteComponent
class BasicCoffee implements Coffee {
    public double cost() {
        return 1.0;
    }

    public String description() {
        return "Coffee";
    }
}

// Decorator
abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }
}

// ConcreteDecorator
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    public double cost() {
        return decoratedCoffee.cost() + 0.5;
    }

    public String description() {
        return decoratedCoffee.description() + ", Milk";
    }
}
```

```Java
// Main class
public class Main {
    public static void main(String[] args) {
        Coffee myCoffee = new BasicCoffee();
        myCoffee = new MilkDecorator(myCoffee);

        System.out.println(myCoffee.description() + ": $" + myCoffee.cost());
    }
}
```

This example demonstrates adding functionality (milk) to a basic coffee object dynamically, showcasing how the Decorator Pattern works.

## Pros and cons

### Pros:

1. Offers more flexibility than static inheritance.
2. Eliminates the need for an excessive number of subclasses, making code maintenance easier.
3. Enables the dynamic and transparent addition of tasks.

### Cons:

1. Can result in many little classes, making a system more difficult to understand.
2. Overuse can produce complex code that is difficult to debug and maintain.
3. The initial setup may be more involved than utilising subclasses.

## Conclusion

The Decorator Pattern provides a reliable approach for expanding object functionality in a flexible and scalable way. It enables developers to add responsibilities dynamically and helps keep code simple even if needs change or new features are required.
