---
title: 'Prototype Pattern'
date: '2024-03-11'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Creational Design Pattern']
draft: false
summary: 'Efficient Object Replication: Leverage the Prototype Pattern for Optimal Creation.'
authors: ['default']
type: 'Blog'
images: []
---

The Prototype Pattern is a creational design pattern that allows items to be built by cloning an existing object and using its template. It provides a way for creating new things without delving into the intricacies of their development, effectively avoiding the need of expensive conventional constructors.

## Current Problem

Creating objects in software development can be resource-intensive, especially when the process includes expensive operations such as database queries, network requests, or sophisticated computations. Furthermore, if the system requires a large number of similar objects, continually calling the new operator with a constructor may not be the most efficient or manageable technique.

## Solution through Prototype Pattern

The Prototype Pattern addresses these concerns by using an existing item as a prototype and constructing new objects by copying or cloning that prototype. This method eliminates the need for the costly object initialization procedure (such as utilising a constructor) and allows for the addition or modification of properties as needed.

## Real-World Applications

1. **Graphics Editors**: Cloning complex graphic objects like circles, rectangles, and polygons that share basic properties but differ slightly in parameters or styling.
2. **Gaming Environment**: Creating multiple instances of similar NPCs (non-player characters) or game assets with slight variations in attributes without the overhead of initializing each one from scratch.
3. **Configuration Templates**: Storing and cloning pre-configured templates of complex objects in software that needs to deploy numerous instances of similarly configured objects, such as virtual machines or network nodes.

## Structure

The Prototype Pattern normally has two main components:

1. **Prototype**: An interface that defines the clone method, or a base class that implements the function.
2. **Concrete Prototype**: A class that implements the Prototype interface by using the clone function to generate a copy of an existing object.

## Real-World Example with Code Snippet

Consider a scenario where you have a Shape prototype, and you want to create exact copies of this shape with some modifications:

```Java
// Prototype
public abstract class Shape implements Cloneable {
    private String id;
    protected String type;

    abstract void draw();

    public String getType(){
        return type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Object clone() {
        Object clone = null;
        try {
            clone = super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return clone;
    }
}

// Concrete Prototype
public class Rectangle extends Shape {
    public Rectangle() {
        type = "Rectangle";
    }

    @Override
    public void draw() {
        System.out.println("Inside Rectangle::draw() method.");
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        Rectangle rect = new Rectangle();
        rect.setId("1");
        Shape clonedRect = (Rectangle) rect.clone();

        System.out.println("Shape : " + clonedRect.getType());
        clonedRect.draw();
    }
}
```

In this example, **Rectangle** is a concrete prototype that can be cloned, avoiding the need to re-initialize it through the constructor each time you need a similar object.

## Pros and cons

### Pros:

1. Efficient object cloning prevents costly creation operations.
2. Increases the flexibility of the instantiation process in dynamic systems.
3. Reduces the requirement for subclassing and instead focuses on object construction.

### Cons:

1. Cloning complicated objects with circular references can be difficult.
2. Sometimes the clone function is difficult to implement, especially if the classes have complicated internal structures.

## Conclusion

The Prototype Pattern is useful in situations where the system needs to produce new objects quickly without incurring the overhead of new instantiation. It provides flexibility and can considerably increase application performance and memory use, particularly when making multiple instances of complicated objects.
