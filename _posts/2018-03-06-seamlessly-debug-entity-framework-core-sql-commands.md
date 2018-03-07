---
title: Seamlessly debug Entity Framework Core SQL commands
keywords:
  - csharp
  - nuget
  - entity framework
---

[Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) _(EF Core)_ is a lightweight [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) for [.NET Core](https://docs.microsoft.com/en-us/dotnet/core/). It is a complete rewrite that maintains most of the functionality of [Entity Framework](https://docs.microsoft.com/en-us/ef/ef6/index). EF Core brings some exciting new features such as multi-platform support. And it also misses capabilities such as the ability to seamlessly debug the generated SQL. The EF Core team is tracking [this issue](https://github.com/aspnet/EntityFrameworkCore/issues/6482). In the meantime, here's my solution to the problem.  

**TL;DR:** [Use my `DebugEFCore` nuget package](https://github.com/camilin87/debug-ef-core)  

## Before: Entity Framework  

[Entity Framework](https://docs.microsoft.com/en-us/ef/ef6/index) provides a convenient way to [debug the database commands being executed](https://msdn.microsoft.com/en-us/library/dn469464%28v=vs.113%29.aspx).  

```csharp
using (var context = new SampleContext()) 
{ 
    context.Database.Log = Console.Write;
}
```

## After: EF Core  

I created the [`DebugEFCore` nuget package](https://github.com/camilin87/debug-ef-core) to achieve the same behavior.  

```csharp
using DebugEFCore;

public class SampleContext : DbContext
{
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    var debugLoggingEnabled = true;
    optionsBuilder.EnableLogging(debugLoggingEnabled);
  }
}
```

## How does it work?  

EF Core has some built-in capabilities around logging that potentially allow the debugging of the executed SQL commands. This debugging doesn't come without a fair share of effort and knowledge. The [`DebugEFCore` nuget](https://github.com/camilin87/debug-ef-core) abstracts away the complexities of dealing with the EF Core internals.  

### Existing EF Core infrastructure  

1. The `DbContext` class provides a virtual [`OnConfiguring`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext.onconfiguring?view=efcore-2.0) method that gets invoked for every context instance.  
2. The `OnConfiguring` method receives a [`DbContextOptionsBuilder`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontextoptionsbuilder?view=efcore-2.0) parameter.  
3. The `DbContextOptionsBuilder` class has a [`UseLoggerFactory(ILoggerFactory)`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontextoptionsbuilder.useloggerfactory?view=efcore-2.0#Microsoft_EntityFrameworkCore_DbContextOptionsBuilder_UseLoggerFactory_Microsoft_Extensions_Logging_ILoggerFactory_) method to configure the `DbContext` logging.  

### [`DebugEFCore`](https://github.com/camilin87/debug-ef-core) internals  

1. Create an implementation of the [`ILoggerFactory`](https://docs.microsoft.com/en-us/dotnet/api/Microsoft.Extensions.Logging.ILoggerFactory?view=aspnetcore-2.0) interface. This implementation will proxy every log message it receives to a `log4net` logger. [Detailed Source Code](https://github.com/camilin87/debug-ef-core/blob/master/DataContextLoggerProvider.cs).  
2. The nuget adds an extension method [`EnableLogging`](https://github.com/camilin87/debug-ef-core/blob/master/DbContextOptionsBuilderExtensions.cs) to the `DbContextOptionsBuilder` class. This method will call the `DbContextOptionsBuilder.UseLoggerFactory` only when logging is necessary.   

## FAQs

### Why debug the SQL code an ORM produces?  

[ORMs](https://en.wikipedia.org/wiki/Object-relational_mapping) abstract away many of the complexities of dealing with databases. They streamline the development process and help engineers focus on the task at hand.  

Many software projects work for years without encountering performance problems. Others are not so lucky: processes start to take longer, applications crash randomly, the same code doesn't work in different environments.  

The database is usually a smoking gun during performance issues. The problem with ORMs is that they abstract away the database interactions. A minor change in the ORM usage could ripple into major database performance issues. In times like these is necessary to debug the generated SQL code in order to effectively tweak the ORM usage.  

## Are ORMs bad?  

No. They are just tools. [Martin Fowler's views on the subject](https://martinfowler.com/bliki/OrmHate.html).  

## Should I write my own SQL commands?  

No. Replicating an ORM feature set is a gargantuan task. [Similar Stack Overflow question](https://stackoverflow.com/questions/494816/using-an-orm-or-plain-sql).  
