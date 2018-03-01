---
title: Lazy properties without compromises in C#
---

The Lazy pattern is very helpful and widely adopted. However, most of the times its usage comes with compromises: the code looks ugly, it is not thread-safe, locks everywhere. The book [Functional Programming in Java](/2018/02/27/functional-programming-in-java/) contains a great implementation of the Lazy pattern. This post is my attempt to explain the C# implementation.  

**TL;DR:** [Use my `LazyPropertyHelper` nuget package](https://github.com/camilin87/lazy-property-helper) for lazy properties. Read [Functional Programming in Java](http://amzn.to/2F61g1h).  

These are two attempts to implement the Lazy pattern. Each has its own benefits and drawbacks.  

_All code samples [can be found here](https://github.com/camilin87/ThreadSafeEfficientLazyProperty)._  

## Attempt 1: Being Lazy and naive  

Throughout my career I've written code like this. The code performs an expensive computation only when needed and caches the result to prevent unnecessary computations.  

```csharp
public class MyServiceNaive
{
  private ExpensiveObject _expensiveLoad;

  public ExpensiveObject ExpensiveLoad
  {
    get
    {
      if (_expensiveLoad == null)
      {
        _expensiveLoad = new ExpensiveObject();
      }

      return _expensiveLoad;
    }
  }
}
```

This code can be subject to weird race-conditions in a multi-threaded environment.  

## Attempt 2: Being Lazy and inefficient  

The next approach is much better in terms of thread-safety. The expensive computation is executed only once.  

```csharp
public class MyLockedService
{
  private object _criticalSection = new object();

  private ExpensiveObject _expensiveLoad;

  public ExpensiveObject ExpensiveLoad
  {
    get
    {
      lock (_criticalSection)
      {
        if (_expensiveLoad == null)
        {
          _expensiveLoad = new ExpensiveObject();
        }
      }

      return _expensiveLoad;
    }
  }
}
```

This code has one major drawback: the lock gets acquired on every read. This behavior can greatly impact performance of multi-threaded applications.  

## Lazy properties without compromises  

Wouldn't it be nice if the two previous solutions could be merged? Implement a thread-safe lazy pattern where the lock is acquired only once, and subsequent reads are fast.  

```csharp
public class MyAwesomeService
{
  private object _criticalSection = new object();
  private Func<ExpensiveObject> _expensiveLoadReader;

  public MyAwesomeService() => _expensiveLoadReader = createAndCacheExpensiveLoad;

  public ExpensiveObject ExpensiveLoad => _expensiveLoadReader();

  private class ExpensiveObjectFactory
  {
    private readonly ExpensiveObject _cachedResult = new ExpensiveObject();

    public ExpensiveObject Build() => _cachedResult;
  }
  
  private ExpensiveObject createAndCacheExpensiveLoad()
  {
    lock (_criticalSection)
    {
      if (_expensiveLoadReader == createAndCacheExpensiveLoad)
      {
        _expensiveLoadReader = new ExpensiveObjectFactory().Build;
      }
    }
    
    return _expensiveLoadReader();
  }
}
```

That is certainly a lot of code. Let's break it down:  

1. `ExpensiveLoad` is a property that returns whatever `_expensiveLoadReader` returns  
2. `_expensiveLoadReader` will call `createAndCacheExpensiveLoad` by default  
3. `createAndCacheExpensiveLoad` will replace `_expensiveLoadReader` the first time it gets called. This replacement will be thread-safe  
4. Subsequent calls to `_expensiveLoadReader` will return whatever `ExpensiveObjectFactory.Build` returns. These calls don't need locks because they're not mutating anything  
5. `ExpensiveObjectFactory.Build` returns `_cachedResult`  
6. `_cachedResult` is only calculated once  

This solution is certainly effective. And very complex too. Who would want to write all that code for a Lazy property?  

## [`LazyPropertyHelper`](https://github.com/camilin87/ThreadSafeEfficientLazyProperty) nuget to the rescue  

> All problems in computer science can be solved by another level of indirection. David Wheeler.  

I created the [`LazyPropertyHelper`](https://github.com/camilin87/ThreadSafeEfficientLazyProperty) nuget to encapsulate the solution in a reusable way. It is [open source](https://github.com/camilin87/ThreadSafeEfficientLazyProperty), free, and ready to use.  

```csharp
public class MyServiceThatUsesLazyPropertyHelperNuget
{
  private readonly Func<ExpensiveObject> _expensiveLoadReader = 
    LazyProperty.Create(() => new ExpensiveObject());
  public ExpensiveObject ExpensiveLoad => _expensiveLoadReader();
}
```

The service code gets considerably simplified. Let's break it down:  

1. `ExpensiveLoad` is still a property that returns whatever `_expensiveLoadReader` returns  
2. `_expensiveLoadReader` will create a `new ExpensiveObject()` the first time it gets called. It will cache the result in a thread-safe manner  
3. Subsequent calls to `_expensiveLoadReader` will always return the cached object without the need for locks  

## Summary  

The complexities of implementing the Lazy pattern in a thread-safe an efficient manner can be abstracted out into a reusable library. [Functional Programming in Java](/2018/02/27/functional-programming-in-java/) is a great book for any platform.  
