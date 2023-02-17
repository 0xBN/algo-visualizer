# Algorithm Visualizer


## fCost = gCost + hCost
- gCost: movement cost - distance from starting node
- hCost: distance to end node (heuristic), opposite of gCost. How far current node is from the end node
- fCost: gCost + hCost

## Procedure
1. Get all neighbor fCosts and choose the lowest fCost
2. lowest fCost is marked as "closed"
3. Calculate all neighbor fCosts from new position (previous lowest fCost)
4. Continue this pattern until reach goal.
5. As the goal node gets closer: fCost stays same, because gCost increases and hCost decreases

# algo-visualizer
