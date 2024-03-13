---
title: 'Adapter Pattern'
date: '2024-03-13'
tags: ['System Design', 'Low Level Design', 'LLD']
draft: false
summary: 'Harmonizing Interfaces: The Adapter Pattern for Smooth Integration and Improved Interoperability.'
authors: ['default']
type: 'Blog'
images: []
---

The Adapter Pattern is a structural design pattern that ensures incompatible interfaces may function together. It functions similarly to a bridge, bridging two incompatible interfaces by changing one class's interface into another that clients expect. This pattern allows classes with different interfaces to work together in harmony.

## Current Problem

In software development, it is typical to encounter circumstances in which existing components or libraries are unable to communicate or collaborate due to conflicting APIs. This mismatch is generally caused by differences in method signatures, parameters, or return types, making it difficult to integrate legacy or external systems without changing their code.

## Solution through Adapter Pattern

The Adapter Pattern addresses these incompatibilities by introducing a new layer, the adapter, which translates calls between existing code and the target interface. It wraps itself around the item in need of adaptation, collecting calls to it in a format it understands and interacts with, allowing for smooth communication.

## Real-World Applications

1. **Legacy Data Integration**: Enables the integration of new and old legacy systems by adapting disparate data formats or interfaces, resulting in seamless data flow and system functionality.
2. **External Library Integration**: Enables programmes to use third-party libraries or external systems despite interface differences by changing the external interfaces to match the intended application interfaces.
3. **Device Interface Compatibility**: Facilitates communication between many types of devices and systems by translating signals or data formats, providing compatibility across multiple platforms or technologies.

## Structure

The Adapter Pattern typically involves the following components:

1. **Target**: The interface that the client expects or needs.
2. **Adapter**: The class that implements the Target interface and translates its requests to the Adaptee using the Adaptee interface.
3. **Adaptee**: The existing class or interface that needs adapting.
4. **Client**: The class that interacts with the Target interface.

## Real-World Example with Code Snippet

Consider an application in which you need to integrate a new logging system that demands a new standard logging interface, but you have an existing legacy logger to use.

```Java
// Target interface
public interface NewLogger {
    void log(String message);
}

// Adaptee class
public class LegacyLogger {
    public void logMessage(String message) {
        System.out.println("Legacy Logger: " + message);
    }
}

// Adapter class
public class LoggerAdapter implements NewLogger {
    private LegacyLogger legacyLogger;

    public LoggerAdapter(LegacyLogger legacyLogger) {
        this.legacyLogger = legacyLogger;
    }

    @Override
    public void log(String message) {
        legacyLogger.logMessage(message);
    }
}
```

```Java
// Main class
public class Main {
    public static void main(String[] args) {
        LegacyLogger oldLogger = new LegacyLogger();
        NewLogger logger = new LoggerAdapter(oldLogger);
        logger.log("Hello, World!");
    }
}
```

In this example, **LoggerAdapter** converts the **LegacyLogger** to the NewLogger interface, allowing the client code in the main method to treat the legacy logger as if it were a new logger.

## Pros and cons

### Pros:

1. Improves interoperability between different interfaces, encouraging the reuse of existing code.
2. Provides code flexibility by allowing adaptable interfaces to change without changing existing code.
3. Encapsulates the conversion between distinct interfaces, hence segregating concerns within the application.

### Cons:

1. Increases application complexity by adding new layers and potentially more code.
2. Can result in less-than-ideal code structure, particularly if used widely throughout an application, making it more difficult to understand and maintain.

## Conclusion

The Adapter Pattern is useful for guaranteeing that diverse pieces of a system can operate together seamlessly. By resolving interface incompatibilities, developers can incorporate legacy systems, external libraries, or new frameworks without affecting existing code, promoting system evolution and extensibility.
