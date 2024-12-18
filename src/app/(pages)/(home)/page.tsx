"use client";
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import Link from "next/link";

const images = [
  {
    src: "https://mznews.co.mz/wp-content/uploads/2024/08/Mocambique-basquetebol-feminino.jpg",
    alt: "Imagem 1",
    link: "https://exemplo.com/link1"
  },
  {
    src: "https://static01.nyt.com/images/2016/01/21/sports/21THREEweb1/21THREEweb1-superJumbo.jpg",
    alt: "Imagem 2",
    link: "https://exemplo.com/link2"
  },
  {
    src: "https://media.wired.com/photos/5926f575ac01987bf01380e3/master/w_2560%2Cc_limit/TPSCurryTA-517150704.jpg",
    alt: "Imagem 3",
    link: "https://exemplo.com/link3"
  },
  // Adicione mais imagens conforme necessário
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Estado para armazenar a posição inicial do toque
  const [touchStart, setTouchStart] = useState(0);

  // Função para navegar para a imagem anterior
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Função para navegar para a próxima imagem
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Função para navegar diretamente para uma imagem clicada nas bolinhas
  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Efeito para trocar a imagem automaticamente
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage(); // Trocar para a próxima imagem
    }, 10000); // Mudar a cada 5 segundos

    return () => clearInterval(intervalId); // Limpar intervalo quando o componente for desmontado
  }, []);

  // Função para lidar com o evento de rolagem do mouse
  const handleWheel = (e: React.WheelEvent) => {
    // Impedir o comportamento padrão da rolagem (como rolar a página)
    e.preventDefault();

    // Detectar a rotação vertical
    if (e.deltaY > 0) {
      nextImage(); // Se a rolagem for para baixo (deltaY positivo), vai para a próxima imagem
    } else {
      prevImage(); // Se a rolagem for para cima (deltaY negativo), vai para a imagem anterior
    }
  };

  // Funções para detectar swipe com o dedo
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartPosition = e.touches[0].clientX;
    setTouchStart(touchStartPosition);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchMovePosition = e.touches[0].clientX;
    const touchDiff = touchStart - touchMovePosition;

    if (touchDiff > 50) {
      nextImage(); // Swipe para a esquerda
      setTouchStart(0); // Resetar a posição do toque
    } else if (touchDiff < -50) {
      prevImage(); // Swipe para a direita
      setTouchStart(0); // Resetar a posição do toque
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(0); // Resetar a posição do toque ao finalizar
  };

  return (
    <main>
      <Header />

      {/* Slider de Imagens com Transição Suave */}
      <section className="relative py-0 px-0">
        <div className="relative w-full h-screen overflow-hidden">
          {/* Contêiner que segura as imagens */}
          <div
            ref={containerRef}
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`, // Controlar a transição das imagens
            }}
            onWheel={handleWheel} // Adiciona o evento de scroll
            onTouchStart={handleTouchStart} // Detecta o início do toque
            onTouchMove={handleTouchMove} // Detecta o movimento do toque
            onTouchEnd={handleTouchEnd} // Finaliza o movimento do toque
          >
            {images.map((image, index) => (
              <div key={index} className="w-full h-screen flex-shrink-0">
                <Link href={image.link}>
                  <div className="w-full h-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full h-fit object-cover"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de Navegação (bolinhas) */}
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-400'} transition-all`}
            />
          ))}
        </div>
      </section>

      {/* Seção de Introdução */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-2xl md:text-3xl animate-bounce font-bold mb-4">
          Bem-vindo ao
        </h1>
        <h1 className="text-2xl md:text-3xl animate-bounce font-bold mb-4">
          Tri-ploThreePointer
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          O Tri-plo ThreePointer é o seu portal de referência para o basquetebol moçambicano! Criado com o objetivo de promover o Desporto e destacar talentos nacionais, nosso site combina informações, rankings, serviços de treinamento e muito mais, consolidando-se como a principal plataforma de visibilidade para atletas e equipes.
        </p>
      </section>
    </main>
  );
};

export default Home;
