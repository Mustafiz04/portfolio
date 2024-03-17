---
title: 'Builder Pattern'
date: '2024-03-11'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns']
draft: false
summary: 'Streamlining Complex Constructions: The Builder Pattern for Modular and Readable Object Creation.'
authors: ['default']
type: 'Blog'
images: []
---

The Builder Pattern is a renowned member of the creational design patterns family, with a concentration on building complicated objects step by step. It is especially handy when an object must be built with multiple configuration options, not all of which are required. This pattern excels in simplifying the development of objects with multiple fields, some of which may be optional.

## Current Problem

Creating complicated objects directly frequently results in constructors with many parameters, a situation known as the "telescoping constructor" anti-pattern. This not only makes the code difficult to read and maintain, but it also increases the likelihood of errors, particularly when working with several optional arguments or object settings.

## Solution through Builder Pattern

The Builder Pattern overcomes these challenges by allowing you to build objects step by step, isolating the creation of a complicated entity from its representation. This allows one to construct objects with different configurations using the same creation code, eliminating the need for multiple constructors and simplifying the client code.

## Real-World Applications

1. **Customisable Meal Orders**: Create complicated meal orders in a restaurant app, allowing for a variety of ingredient combinations and alternatives without overwhelming constructors.
2. **Vehicle Manufacturing**: Putting together numerous sorts of vehicles and defining various features (engine, wheels, colour) while keeping the construction process decoupled and regulated.
3. **Software Configuration**: Creating sophisticated software configurations with various settings while giving a user-friendly interface to define only the important options for specific installations.

## Structure

The Builder Pattern typically includes the following components:

1. **Builder**: An interface that outlines all of the stages required to create a product.
2. **Concrete Builder**: Implements the builder interface and specifies how to produce the actual product. It keeps the product that it makes.
3. **Director**: (Optional) The class that determines the sequence in which the building processes should be completed.
4. **Product**: The complex thing that is being constructed.

## Real-World Example with Code Snippet

Consider building a complex user profile in an application:

```Java
public class UserProfile {
    private final String firstName;   // Required
    private final String lastName;    // Required
    private final int age;            // Optional
    private final String phone;       // Optional
    private final String address;     // Optional

    private UserProfile(UserProfileBuilder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.age = builder.age;
        this.phone = builder.phone;
        this.address = builder.address;
    }

    public static class UserProfileBuilder {
        private final String firstName;
        private final String lastName;
        private int age;
        private String phone;
        private String address;

        public UserProfileBuilder(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        public UserProfileBuilder age(int age) {
            this.age = age;
            return this;
        }

        public UserProfileBuilder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public UserProfileBuilder address(String address) {
            this.address = address;
            return this;
        }

        public UserProfile build() {
            return new UserProfile(this);
        }
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        UserProfile userProfile = new UserProfile.UserProfileBuilder("John", "Doe")
                                .age(30)
                                .phone("1234567890")
                                .address("123 Main St, Anytown, USA")
                                .build();

        // Now you can use the userProfile object as needed
        System.out.println("User Profile Created: ");
        System.out.println("Name: " + userProfile.firstName + " " + userProfile.lastName);
        System.out.println("Age: " + userProfile.age);
        System.out.println("Phone: " + userProfile.phone);
        System.out.println("Address: " + userProfile.address);
    }
}
```

In this example, the **UserProfileBuilder** class allows the step-by-step construction of a **UserProfile** object, enabling the optional setting of properties.

## Pros and cons

### Pros:

1. Allows you to create objects with a variety of options.
2. Promotes a clearer, more readable approach to creating complicated objects.
3. Because all properties are set before the object is formed, this helps to enforce the final object's immutability.

### Cons:

1. The builder must be kept alongside the product class, increasing the code's complexity.
2. Create a separate ConcreteBuilder for each type of product.

## Conclusion

The Builder Pattern is quite useful for creating complicated objects with multiple configurable choices. It encourages code clarity, simplicity, and flexibility, allowing the creation process to be tailored to individual requirements while keeping the resulting code clean and manageable.
