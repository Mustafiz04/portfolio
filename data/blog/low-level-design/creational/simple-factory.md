---
title: 'Simple Factory Pattern'
date: '2024-03-08'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Creational Design Pattern']
draft: false
summary: 'Streamlining Object Creation: The Simple Factory Pattern for Flexible and Decoupled System Design.'
authors: ['default']
type: 'Blog'
images: []
---

The Simple Factory stands out among software design patterns as a simple but effective technique for object production. This creational style streamlines the instantiation process, particularly when the specific sorts of objects to construct vary or when the system must be independent of how its objects are formed and represented. This article will take you on a journey to learn about the Simple Factory, its operational mechanics, implementation instructions, and practical applications.

## Current Problem

Software developers frequently face the difficulty of managing object generation without hardwiring class characteristics into their code. Such rigidity can cause issues when extending the system, as changes in object instantiation may need updates across multiple portions of the programme. This tight connection between classes and the objects they generate also reduces flexibility and scalability, which are critical for the dynamic nature of software systems.

## Solution through Simple Factory

The Simple Factory tackles these concerns by providing a single component that handles object generation, thereby centralising the process and promoting consistency and adaptability. Delegating instantiation logic to a separate factory adds a layer of abstraction to the system, allowing for the modification or introduction of existing objects without affecting the main application logic.

## Real-World Applications

1. **Notification Systems**: Makes it easier to create alternative notifications, such as emails or SMS, hence improving adaptability and maintenance.
2. **User Interface Components**: Allows the dynamic development of UI elements such as buttons and text fields, boosting runtime flexibility and design extension.
3. **Payment Processing**: Streamlines the integration of several payment methods, allowing for quick expansion and few code changes.
4. **Document Management**: Enables the dynamic generation of several document kinds (PDF, Word, and Excel), allowing for easy system extension with new formats.
5. **Resource Managers**: Oversee the construction of resource-intensive objects (data connections, file systems), ensuring seamless adaption to new resource kinds.
6. **Toolkits and Libraries**: Enables the instantiation of various tools or library components as needed, facilitating easy toolkit extension and capability development.


## Structure

The Simple Factory typically includes the following components:

1. **Factory Class**: This class contains a method that returns various sorts of objects depending on the input it gets. It abstracts the instantiation logic from the client.
2. **Product Interface**: Often, the objects created by the factory follow a similar interface or base class from which they inherit, ensuring that the returned objects are interchangeable.
3. **Concrete Products**: These are the specific classes that implement the product interface or extend the base class and represent the objects created by the factory function.

## Real-World Example with Code Snippet

Consider a simplistic scenario of a notification system that sends different types of notifications (e.g., Email, SMS, Push):

```Java
public interface Notification {
    void notifyUser();
}

public class EmailNotification implements Notification {
    public void notifyUser() {
        System.out.println("Sending an email notification.");
    }
}

public class SMSNotification implements Notification {
    public void notifyUser() {
        System.out.println("Sending an SMS notification.");
    }
}

public class NotificationFactory {
    public Notification createNotification(String channel) {
        if (channel == null || channel.isEmpty())
            return null;
        if ("SMS".equals(channel)) {
            return new SMSNotification();
        }
        else if ("Email".equals(channel)) {
            return new EmailNotification();
        }
        return null;
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        NotificationFactory notificationFactory = new NotificationFactory();

        // Create an email notification
        Notification emailNotification = notificationFactory.createNotification("Email");
        if (emailNotification != null) {
            emailNotification.notifyUser();
        } else {
            System.out.println("Invalid notification channel for email.");
        }

        // Create an SMS notification
        Notification smsNotification = notificationFactory.createNotification("SMS");
        if (smsNotification != null) {
            smsNotification.notifyUser();
        } else {
            System.out.println("Invalid notification channel for SMS.");
        }

        // Attempt to create a notification with an unsupported channel
        Notification invalidNotification = notificationFactory.createNotification("Push");
        if (invalidNotification == null) {
            System.out.println("Invalid notification channel.");
        }
    }
}
```

The code defines a factory that creates and returns an EmailNotification or SMSNotification object based on the input string. This factory method streamlines the instantiation process, making the notification system easy to scale and modify.

## Pros and cons

### Pros:

1. Improves modularity by isolating the object generation process.
2. Simplifies code by centralising the creation logic.
3. Scalability is facilitated because new items may be introduced with little application changes.

### Cons:

1. As the factory becomes the centre point of logic determination, it might result in complicated code architectures.
2. If the factory method is not properly implemented, it may result in a single point of failure.
3. As more items are introduced, the factory class may become complex and violate the open/closed concept.


## Conclusion

The Simple Factory provides a streamlined, consistent way to object production, particularly in systems where the types of objects vary. It wraps the creation logic, which decouples the system's components and allows for more flexible and maintainable code. While it is an elegant approach, developers must assess its benefits against any drawbacks, ensuring that the pattern is appropriate for the application's requirements and expected evolution.