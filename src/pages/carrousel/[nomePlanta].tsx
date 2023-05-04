import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function NomePlanta({plant}: any){
    return(
        <>
        <h1 key={plant._id}>{plant.nomePopular}</h1>
            <Carousel showThumbs={false}>
                <div>
                    { plant.images.map((image: any) => (
                        <img key={plant._id} src={image.url} alt={plant.nomePopular} />
                    ))}
                </div>
                <div>
                    <h1>{plant.desempenho}</h1>
                </div>
            </Carousel>
        </>
    )
}

// Caminhos da rotas pelo nome popular da planta
export async function getStaticPaths(){
    const plants = await fetch('https://forragensalt.onrender.com');
    const data = await plants.json();

    const paths = await data.map((plant: any) =>{
        return{
            params:{
                nomePlanta: `${plant.nomePopular}`
            }
        }
    });

    return{
        paths,
        fallback: false,
    }
}

// Chamando a planta pelos parametros
export async function getStaticProps(context: any){
    const { params } = context;
    const plant = await fetch(`https://forragensalt.onrender.com/planta/${params.nomePlanta}`);
    const data = await plant.json();

    return{
        props:{
            plant: data
        }
    }
}