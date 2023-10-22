<script>
    import jsonData from "./test.json";
    
    async function rewriteJSON() {
        jsonData.test[1].nom = "Seb";
        
        const response = await fetch('/bo/bo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify that you're sending JSON
            },
            body: JSON.stringify(jsonData), // Convert JSON to a string
        });
        if (response.ok) {
            console.log('JSON file has been rewritten!');
        } else {
            console.error('Failed to rewrite the JSON file.');
        }
    }
</script>

<button on:click={rewriteJSON}>Rewrite JSON</button>