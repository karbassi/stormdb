# StormDB Speed

StormDB features some blazingly fast read and write speeds. All benchmarks done on the same i5 CPU. All table figures rounded to 2 D.P.

StormDB write speed table. [Code for Write Benchmarks](../benchmarks/writeBenchmark.js)

| No. of Attributes Written | Time Elapsed | Attributes Wrote/sec | Data Size Wrote |
| ------------------------- | ------------ | -------------------- | --------------- |
| 100,000                   | 54ms         | 1851851.85/sec       | 1.32mb          |
| 1,000,000                 | 487ms        | 2053388.09/sec       | 14.20mb         |
| 10,000,000                | 13312ms      | 751201.92/sec        | 151.53mb        |

StormDB read speed table. [Code for Read Benchmarks](../benchmarks/readBenchmark.js)

| No. of Attributes Read | Time Elapsed | Attributes Read/sec | Data Size Read |
| ---------------------- | ------------ | ------------------- | -------------- |
| 100,000                | 15ms         | 6666666.67/sec      | 1.32mb         |
| 1,000,000              | 161ms        | 6211180.12/sec      | 14.20mb        |
| 10,000,000             | 1499ms       | 6671114.08/sec      | 151.53mb       |
