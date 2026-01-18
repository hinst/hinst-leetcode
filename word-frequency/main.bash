# Read from the file words.txt and output the word frequency list to stdout.
declare -A words
while read -r line || [ -n "$line" ]
do
	for word in $line
	do
		words["$word"]=$((words["$word"] + 1))
	done
done < "words.txt"
for word in "${!words[@]}"
do
	echo "$word ${words[$word]}"
done | sort -n -r -k 2
