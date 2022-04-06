import { useRouter } from 'next/router';

export default function fetcher (url, data ) {
    const router = useRouter()

    fetch(window.location.origin + url, {
        method: data ? "POST" : "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(res => {
        return res.json();
    }).then(res => {
        console.log('res fetcher', res.from)
        switch (res.from) { //from is added property in API
            case "SIGNIN": return router.push('/dashboard');
            case "CREATE": return alert('przejescie na strone głowną');
            default: throw new Error('Error in utils -> fetcher')
          }
    })
}
