export default function Trails(trails) {
    if (trails) {
        return (        
            <ul>
                {trails.trails.map((trail, index) => (
                    <li key={index}>
                        {trail.id + " - " + trail.title}
                    </li>
                ))}
            </ul>
        );
    }
}