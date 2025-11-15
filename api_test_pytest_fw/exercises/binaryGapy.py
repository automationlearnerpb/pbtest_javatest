def solution(binary_number):
    # Split dictionary and message into lists of words
    binary_str = str(binary_number[2:]) # Remove '0b' prefix
    print("Binary String:", binary_str)
    print("Length of Binary String:", len(binary_str))
    binary_gap = []    
    zero_counter=0
  

    for i in range(len(binary_str)):
        if binary_str[i] == '0':
            zero_counter += 1
            print(f"Character at index {i} is zero.")
        elif binary_str[i] == '1':
            binary_gap.append(zero_counter)
            zero_counter = 0
            
    print("Binary Gap List:", binary_gap)
    return max(binary_gap) if binary_gap else 0
    
if __name__ == "__main__":
    with open("test-input-bg.txt") as f:
        lines = f.readlines()

        for each_line in lines:
            print("Input Line:", each_line.strip())
            number_bin = bin(int(each_line.strip()))
            if not number_bin:
                raise ValueError('File must contain an integer.')
        
            print(solution(number_bin))

    f.close()
    
