# you can write to stdout for debugging purposes, e.g.
# print("this is a debug message")

def solution(N):
    count = 0
    index = 0
    A = [int(x) for x in N.split(',')]
    #A = list(dict.fromkeys(A))
    A = list(A)

    while index != len(A):
        if (A[index]!=-1) and(A[index]!=A[index-1]) and (index!=0):
            count += 1
        
        index+=1
        #print("Next Index:", index)

    return count
    
if __name__ == "__main__":
    with open("test-input-singlylinked.txt") as f:
        lines = f.readlines()

        for each_line in lines:
            #print("Input Line:", each_line.strip())
            N = each_line.strip()
            #print("Raw Input:", N)
            #N = list(N[1:-1].split(","))
            #print(N)
            if not N:
                raise ValueError('File must contain a list.')
        
            print(solution(N))

    f.close()