export default function Message({success, text}){
        return (
            <>
            {success ? (
                <p style={{color: 'green', marginBottom: '10px'}}>{text}</p>
                ) : (
                <p style={{color: 'red', marginBottom: '10px'}}>{text}</p>
            )}
            </>
        )
}