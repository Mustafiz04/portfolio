---
title: 'System Design Roadmap in 2024'
date: '2024-03-04'
tags: ['System Design', 'High Level Design', 'HLD']
draft: false
summary: 'Being an expert in system design is crucial for software engineers. This is the guide that you can use.'
authors: ['default']
type: 'Blog'
---

Throughout the last two years, there have been several changes to technical interviews. The most frequent and notable change is the system design interview. Having a single system design interview has become mandatory. Understanding design, thought processes, and the capacity to create any product from start, regardless of experience level—from one year to over ten—are the goals of this interview.

## Here is a more detailed roadmap that you can use in 2024.

> _Note: I'll be writing in-depth posts on each topic shortly._

- Introduction
  - What is System Design ?
  - How to approach System Design.
- Performance vs Scalability
- Latency vs Throughput
- Availability vs Consistency
  - CAP Theorem
    - AP - Availability + Partition Tolerance
    - CP - Consistency + Partition Tolerance
- Consistency pattern
  - Weak Consistency
  - Eventual Consistency
  - String Consistency
- Availability Patterns
  - Availability in Numbers
    - 99.9% availability - three 9s
    - 99.99% availability - four 9s
    - 99.999% availability - five 9s
  - Fail over
    - Active-Passive
    - Active-Active
  - Replication
    - Master-Slave
    - Master-Master
- Background Jobs
  - Event-Driven
  - Schedule Driven
- Domain Name System
- Content Delivery Networks
  - Push CDNs
  - Pull CDNs
- Load Balancers
  - Load Balancer vs Reverse Proxy
  - Load Balancing Algorithm
  - Layer 7 Load Balancing
  - Layer 4 Load Balancing
  - Horizontal Scaling
- Application Layer
  - Microservices
  - Service Discovery
- Databases
  - SQL vs NoSQL
  - NoSQL
    - Key-Value Store
    - Document Store
    - Wide Column Store
    - Graph Databases
  - RDBMS
    - Replication
    - Sharding
    - Federation
    - Denormalization
    - SQL Tuning
- Caching
  - Client Caching
  - CDN Caching
  - Web Server Caching
  - Database Caching
  - Application Caching
  - Strategies
    - Cache Aside
    - Write through
    - Write behind
    - Refresh Ahead
- Asynchronism
  - Message Queues
  - Task Queues
  - Back Pressure
- Idempotent Operations
- Communication
  - HTTP
  - TCP
  - UDP
  - REST
  - RPC
  - gRPC
  - GraphQL
- Monitoring
  - Health Monitoring
  - Availability Monitoring
  - Performance Monitoring
  - Security Monitoring
  - Usage Monitoring
  - Instrumentation
  - Visualization and Alerts
- Cloud Design Patterns
  - Messaging
  - Data Management
  - Design & Implementation
  - Reliability Patterns
    - Availability
    - High Availability
    - Resiliency
    - Security
