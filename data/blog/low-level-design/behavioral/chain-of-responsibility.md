---
title: 'Chain of Responsibilty Pattern'
date: '2024-05-09'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Behavioral Design Pattern']
draft: false
summary: 'Chain of Responsibility: A flexible solution for systematic request handling in software systems.'
authors: ['default']
type: 'Blog'
images: []
---

In the field of software engineering, addressing the complexity of system architecture and guaranteeing flexibility in fulfilling demands is critical. Design patterns are one of the tried-and-true techniques for addressing this difficulty. Among them, the Chain of Responsibility pattern stands out as an excellent solution for systematically delegating requests, offering a flexible and scalable approach to handling a variety of request types.

## Current Problem

In software development, particularly in systems with several components, a recurring difficulty is how to handle requests efficiently while keeping the system decoupled and easily manageable. Traditional methodologies frequently result in tightly coupled code, making it difficult to add or modify features without affecting the entire system. Furthermore, dealing with a variety of requests with diverse processing requirements becomes time-consuming.

## Solution through Chain of Responsibility

The Chain of Responsibility paradigm solves these problems by establishing a chain of handler objects. Each handler in the chain can process the request or route it to the next handler in the chain. This architecture encourages loose coupling and flexibility, allowing handlers to be added, withdrawn, or modified individually without affecting the client or the rest of the system.

## Real-World Applications

Consider a real-world scenario: a customer care system that routes client inquiries via numerous departments for response.

1. **Request Handling**: In the chain, a handler represents each department (for example, Sales, Technical Support, and Billing).
2. **Processing Logic**: Once a client query is received, it is routed through the chain. If a department can handle the question, it processes it; otherwise, the query is routed to the next department in the chain.
3. **Scalability and flexibility**: New departments can be added to the system without changing the present code. Each department can separately establish its own processing logic.


## Structure

The Chain of Responsibility typically includes the following components:

1. **Handler**: Defines an interface for handling requests and optionally implements the successor link.
2. **ConcreteHandler**: Implements the Handler interface, handling requests it is responsible for and forwarding others to the next handler in the chain.
3. **Client**: Initiates the request to a handler in the chain.
4. **Chain**: Represents the chain of handlers and maintains references to the first handler in the chain.

## Real-World Example with Code Snippet

Consider a simplified example of a logging system where log messages are processed based on their severity:

```Java
interface Logger {
    void logMessage(String message, int severity);
}

class ConsoleLogger implements Logger {
    private Logger nextLogger;

    @Override
    public void logMessage(String message, int severity) {
        if (severity <= 3) {
            System.out.println("Console Logger: " + message);
        } else if (nextLogger != null) {
            nextLogger.logMessage(message, severity);
        }
    }

    public void setNextLogger(Logger nextLogger) {
        this.nextLogger = nextLogger;
    }
}

class FileLogger implements Logger {
    private Logger nextLogger;

    @Override
    public void logMessage(String message, int severity) {
        if (severity <= 7) {
            System.out.println("File Logger: " + message);
        } else if (nextLogger != null) {
            nextLogger.logMessage(message, severity);
        }
    }

    public void setNextLogger(Logger nextLogger) {
        this.nextLogger = nextLogger;
    }
}

class EmailLogger implements Logger {
    @Override
    public void logMessage(String message, int severity) {
        if (severity > 7) {
            System.out.println("Email Logger: " + message);
        }
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        Logger consoleLogger = new ConsoleLogger();
        Logger fileLogger = new FileLogger();
        Logger emailLogger = new EmailLogger();

        consoleLogger.setNextLogger(fileLogger);
        fileLogger.setNextLogger(emailLogger);

        consoleLogger.logMessage("Information message", 2);
        consoleLogger.logMessage("Warning message", 5);
        consoleLogger.logMessage("Error message", 9);
    }
}
```


## Pros and cons

### Pros:

1. Promotes a loose link between the sender and recipient.
2. Allows for dynamically adding and removing handlers.
3. Allows for greater flexibility when handling requests.

### Cons:

1. May result in requests not being handled if the chain is not properly configured.
2. Can lead to performance overhead due to the traversal of the chain.

## Conclusion

The Chain of Responsibility pattern provides an effective approach for managing requests in a flexible and scalable way. This design improves software system maintainability and extensibility by separating the sender and receiver and organising handlers into a chain.