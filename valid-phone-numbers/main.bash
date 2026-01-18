# Read from the file file.txt and output all valid phone numbers to stdout.
while read -r line || [ -n "$line" ]
do
	# (xxx) xxx-xxxx or xxx-xxx-xxxx
	if [[ "$line" =~ ^\([0-9]{3}\)\ [0-9]{3}-[0-9]{4}$ ]] || [[ "$line" =~ ^[0-9]{3}-[0-9]{3}-[0-9]{4}$ ]]
	then
		echo "$line"
	fi
done < "file.txt"
