while read -r line || [ -n "$line" ]
do
	# (xxx) xxx-xxxx or xxx-xxx-xxxx
	if [[ "$line" =~ ^\(\d\d\d\)\ \d\d\d-\d\d\d\d$ ]] || [[ "$line" =~ ^\d\d\d-\d\d\d-\d\d\d\d$ ]]
	then
		echo "$line"
	fi
done < "file.txt"
