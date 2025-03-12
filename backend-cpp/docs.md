 sudo g++ -Wall -I/usr/include/cppconn -o database database.cpp -L/usr/lib -lmysqlcppconn

Example bash script for the compilation

```
#!/bin/bash
sudo g++ -Wall -I/usr/include/cppconn -o $2 $1 -L/usr/lib -lmysqlcppconn
```

./cp.sh database database.cpp 
