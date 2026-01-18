# Read from the file file.txt and output the tenth line to stdout.
lineIndex=0
while read -r line || [ -n "$line" ]
do
	lineIndex=$(( lineIndex + 1))
	if [ "$lineIndex" -eq "10" ]
	then
		echo "$line"
	fi
done < "file.txt"
