import React from "react";
import { Container } from "../components/layout/Container";
import { Button } from "../components/ui/Button";

export const NotFoundPage: React.FC = () => {
  return (
    <Container className="pt-40 md:pt-48 pb-32">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.3em] font-mono text-[#c5a059] mb-6">404</p>
        <h1 className="text-5xl sm:text-7xl font-light tracking-tight leading-[1.05] text-white mb-6">
          PAGE NOT FOUND.
        </h1>
        <p className="text-zinc-400 font-light text-lg leading-relaxed mb-10">
          The page you're looking for doesn't exist or has moved. Return to the homepage to continue exploring JOJO.
        </p>
        <Button href="/">Back to Home</Button>
      </div>
    </Container>
  );
};

export default NotFoundPage;