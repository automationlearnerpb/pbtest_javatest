values = list(range(99999, -1, -1))  # start, stop (exclusive), step

values.insert(4,-1)

line = ",".join(map(str, values))


with open("test-input-singlylinked.txt", "w") as f:
    f.write(line + "\n")