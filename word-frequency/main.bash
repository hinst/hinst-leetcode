inputFileName=words.txt
while read -r line
do
	echo $line
done < $inputFileName
