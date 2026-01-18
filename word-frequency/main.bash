# Read from the file words.txt and output the word frequency list to stdout.
while read -r line || [ -n "$line" ]
do
	echo "$line"
done < "words.txt"
