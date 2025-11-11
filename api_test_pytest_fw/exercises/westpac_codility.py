def solution(Dictionary, Message):
    # Split dictionary and message into lists of words
    valid_words = set(word.lower() for word in Dictionary.split())
    print("Valid Words:",valid_words)
    message_words = Message.split()
    
    cleaned_words = []
    for word in message_words:
        # Compare case-insensitively
        if word.lower() in valid_words:
            cleaned_words.append(word)
        else:
            # Replace invalid words with 3 hashes
            cleaned_words.append("###")
    
    # Return the reconstructed message
    return " ".join(cleaned_words)

if __name__ == "__main__":
    with open("test-input.txt") as f:
        lines = f.readlines()

        for each_line in lines:
            print("Input Line:", each_line.strip())
            Dictionary = each_line.strip().split(",")[0].strip('()" ')
            Message =  each_line.strip().split(",")[1].strip('()" ')
            if not Dictionary or not Message:
                raise ValueError('File must contain both "Dictionary" and "Message" lines.')
        
            if len(Dictionary) > 1000 or len(Message) > 1000:
                raise ValueError('Max length of Dictionary or message should be less than 1000 characters.')
            print(solution(Dictionary, Message))

    f.close()
    
