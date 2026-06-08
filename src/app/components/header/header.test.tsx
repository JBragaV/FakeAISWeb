import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./index";

describe("Testes do Header", () => {
  // Reseta o estado global (como scroll) antes de cada teste
  beforeEach(() => {
    window.scrollY = 0;
  });

  describe("Renderização Estrutural", () => {
    it("Deve renderizar o logotipo corretamente", () => {
      render(<Header />);
      const logo = screen.getByRole("link", { name: /AEROMET Meteorologia Aeronáutica/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("href", "/");
    });

    it("deve renderizar a navegação desktop com todos os links", () => {
      render(<Header />);
      const desktopNav = screen.getByRole("navigation", { name: "Navegação principal" });
      
      const expectedLinks = ["METAR", "TAF", "Mapa", "Aeródromos"];
      expectedLinks.forEach((linkText) => {
        expect(within(desktopNav).getByRole("link", { name: linkText })).toBeInTheDocument();
      });
    });

    it("deve exibir o badge de status ao vivo", () => {
      render(<Header />);
      expect(screen.getByText("AO VIVO")).toBeInTheDocument();
      expect(screen.getByTitle("Dados atualizados em tempo real")).toBeInTheDocument();
    });
  });

  describe("Comportamento do Scroll", () => {
    it("deve adicionar a classe 'scrolled' quando o scrollY for maior que 20", () => {
      render(<Header />);
      const headerElement = screen.getByRole("banner"); // O elemento <header> possui role implícita 'banner'

      // Estado inicial (scrollY = 0)
      expect(headerElement.className).not.toMatch(/scrolled/);

      // Dispara o scroll para 21px
      fireEvent.scroll(window, { target: { scrollY: 21 } });
      expect(headerElement.className).toMatch(/scrolled/);

      // Dispara o scroll de volta para o topo
      fireEvent.scroll(window, { target: { scrollY: 10 } });
      expect(headerElement.className).not.toMatch(/scrolled/);
    });
  });

  describe("Comportamento do Menu Mobile", () => {
    it("Deve alternar o estado de abertura do menu ao clicar no botão hamburger", () => {
      render(<Header />);
      
      // Estado Inicial (Fechado)
      const menuButton = screen.getByRole("button", { name: "Abrir menu" });
      expect(menuButton).toHaveAttribute("aria-expanded", "false");

      // Ação: Abrir
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute("aria-label", "Fechar menu");
      expect(menuButton).toHaveAttribute("aria-expanded", "true");

      // Ação: Fechar
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute("aria-label", "Abrir menu");
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });

    it("Deve fechar o menu mobile ao clicar em um link interno", () => {
      render(<Header />);
      
      const menuButton = screen.getByRole("button", { name: "Abrir menu" });
      fireEvent.click(menuButton); // Abre o menu
      
      const mobileNav = screen.getByRole("navigation", { name: "Menu mobile" });
      const firstLink = within(mobileNav).getByRole("link", { name: "METAR" });

      // Ação: Clicar no link de navegação
      fireEvent.click(firstLink);

      // Verifica se o menu foi fechado
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });
  });
});