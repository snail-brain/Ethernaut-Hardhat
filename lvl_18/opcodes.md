# Execute

### Store our value to return in memory
60 2a // Push 42
60 10 // Push 10
52 // Store 42 in memory position 10

### Return our value in memory
60 20 // Push 20
60 10 // Push 10
f3 // Return 32 bytes of data from memory position 10

### Result
602a 6010 52 6020 6010 f3 


# Initialize

### Copy our execution code into memory
60 0a // Push 0a // Length of Code
60 0c // Push 0c // Position of Code
60 00 // Push 00 // Put code in memory position 00
39 // Copy 0a bytes of code from code position 0c into memory position 00

### Return the execution code that's in memory
60 0a // Push 0a // Return 0a bytes 
60 00 // Push 00 // Return from memory position 00
f3 // Return 0a bytes in memory position 00

### Result
600a 600c 6000 39 600a 6000 f3


# Final Bytecode
600a 600c 6000 39 600a 6000 f3 602a 6010 52 6020 6010 f3