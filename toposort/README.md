# toposort

### Overview
Implements a topological sort algorithm.

From[ Wikipedia](http://en.wikipedia.org/wiki/Topological_sorting):
> In computer science, a topological sort (sometimes abbreviated topsort
or toposort) or topological ordering of a directed graph is a linear
ordering of its vertices such that for every directed edge uv from
vertex u to vertex v, u comes before v in the ordering.

### Input data description
The input to the toposort function is an object describing the
dependencies among the input nodes. Each key is a dependent node, the
corresponding value is a set containing the dependent nodes.

Note that toposort does not care what the input node values mean: it
just compares them for equality. The examples here usually use
strings, but they could be any hashable type.

### Typical usage
The interpretation of the input data here is: If MATH-101A has MATH-187 and MATH-188 as a prerequisite, and MATH-101B has MATH-101A as a prerequisite (and so on), then in what order should we process the items such that all nodes are processed before any of their dependencies?
```
toposort({
  "MATH-101A": ["MATH-187", "MATH-188"],
  "MATH-101B": ["MATH-101A"],
  "MATH-101C": ["MATH-101B"],
  "MATH-103": ["MATH-101B"],
  "MATH-104": ["MATH-101B"],
  "MATH-111": ["MATH-101A"],
  "PHYS-140": ["MATH-101A"],
  "PHYS-141": ["PHYS-140", "MATH-101B"],
  "PHYS-142": ["PHYS-140", "MATH-101B"],
})
>>> [
  [ 'MATH-187', 'MATH-188' ],
  [ 'MATH-101A' ],
  [ 'MATH-101B', 'MATH-111', 'PHYS-140'],
  [ 'MATH-101C', 'MATH-103', 'MATH-104', 'PHYS-141', 'PHYS-142' ]
]
```
And the answer is: complete MATH-187 and MATH-188 (in any order); then complete MATH-101A; then complete MATH-101B and MATH-111 and PHYS-140; then complete MATH-101C and MATH-103 and MATH-104 and PHYS-141 and PHYS-142. Note that MATH-187 and MATH-188
are returned first because they do not have prerequisites. They are
then removed from consideration, and then MATH-101A doesn't depend on anything remaining. This process continues until all nodes are
returned, or a circular dependency is detected.

### Circular dependencies
A circular dependency will return the string value "Circular dependency error". Implementation that returns problematic nodes is WIP.
