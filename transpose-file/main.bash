# Read from the file file.txt and print its transposed content to stdout.
declare -a rows
while read -r line || [ -n "$line" ]
do
	wordIndex=0
	for word in $line
	do
		if [ -z "${rows[$wordIndex]}" ]
		then
			rows[$wordIndex]="$word"
		else
			rows[$wordIndex]="${rows[$wordIndex]} $word"
		fi
		wordIndex=$(( wordIndex + 1 ))
	done
done < "file.txt"

for rowIndex in ${!rows[@]}
do
	echo "${rows[$rowIndex]}"
done
