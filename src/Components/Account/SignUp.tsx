import { useRef, useEffect } from 'react';

export const SignUp = () => {
 // Fireworks canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Firework and particle logic
    const colors = ['#ffec70', '#ff7170', '#70cfff', '#b370ff', '#fff', '#ffb370', '#70ffb3'];
    function randomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }
    function randomBetween(a: number, b: number) {
      return a + Math.random() * (b - a);
    }
    class Particle {
      x: number; y: number; vx: number; vy: number; alpha: number; color: string; size: number;
      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = randomBetween(0, Math.PI * 2);
        const speed = randomBetween(2, 6);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.size = randomBetween(1.5, 3.5);
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.03; // gravity
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.alpha -= 0.012;
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = Math.max(this.alpha, 0);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }
    }
    class Firework {
      x: number; y: number; tx: number; ty: number; color: string; speed: number; state: 'fly' | 'burst'; particles: Particle[];
      constructor() {
        this.x = randomBetween(width * 0.2, width * 0.8);
        this.y = height;
        this.tx = this.x + randomBetween(-80, 80);
        this.ty = randomBetween(height * 0.15, height * 0.45);
        this.color = randomColor();
        this.speed = randomBetween(6, 9);
        this.state = 'fly';
        this.particles = [];
      }
      update() {
        if (this.state === 'fly') {
          const dx = (this.tx - this.x) * 0.08;
          const dy = (this.ty - this.y) * 0.08;
          this.x += dx;
          this.y += dy;
          if (Math.abs(this.y - this.ty) < 12) {
            this.state = 'burst';
            for (let i = 0; i < randomBetween(18, 28); i++) {
              this.particles.push(new Particle(this.x, this.y, randomColor()));
            }
          }
        } else {
          this.particles.forEach((p) => p.update());
        }
      }
      draw(ctx: CanvasRenderingContext2D) {
        if (this.state === 'fly') {
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        } else {
          this.particles.forEach((p) => p.draw(ctx));
        }
      }
      isDone() {
        return this.state === 'burst' && this.particles.every((p) => p.alpha <= 0);
      }
    }
    let fireworks: Firework[] = [];
    let animationId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      if (Math.random() < 0.07) {
        fireworks.push(new Firework());
      }
      fireworks.forEach((fw) => {
        fw.update();
        if (ctx) fw.draw(ctx);
      });
      fireworks = fireworks.filter((fw) => !fw.isDone());
      animationId = requestAnimationFrame(animate);
    }
    animate();
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (!canvas || !ctx) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-200 via-gray-400 to-gray-700 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 flex items-center justify-center py-10 overflow-hidden">
      {/* Fireworks Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
      {/* 🧾 Main Signup Content */}
      <div className="relative z-10 grid sm:grid-cols-2 gap-10 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden w-full max-w-5xl">
        {/* Form Section */}
        <div className="flex items-center justify-center p-8">
          <form className="w-full max-w-md space-y-6 bg-gray-700 dark:bg-gray-800 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-yellow-400 text-4xl font-bold mb-2">XpressLootCart KE</div>
              <p className="text-gray-300 dark:text-gray-200 text-lg">Join the Marketplace</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium leading-none text-gray-300" htmlFor="name">
                  Full Name
                </label>
                <input
                  className="flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 border-gray-500"
                  type="text"
                  id="name"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="text-sm font-medium leading-none text-gray-300" htmlFor="contactPhone">
                  Phone Number
                </label>
                <input
                  className="flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 border-gray-500"
                  type="tel"
                  id="contactPhone"
                  placeholder="e.g. +254712345678"
                />
              </div>
              <div>
                <label className="text-sm font-medium leading-none text-gray-300" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 border-gray-500"
                  type="email"
                  id="email"
                  placeholder="e.g. you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium leading-none text-gray-300" htmlFor="password">
                  Password
                </label>
                <input
                  className="flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 border-gray-500"
                  type="password"
                  id="password"
                  placeholder="Create a strong password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-success btn-block mt-8 shadow-md hover:scale-105 transition-transform"
              >
                Create Account
              </button>
              <div className="flex flex-col items-center mt-4 gap-2">
                <a href="/login" className="text-blue-400 hover:underline text-sm">Already have an account? Log in</a>
              </div>
              <p className="text-center text-gray-400 text-sm mt-4">
  🔐 Your gateway to exclusive loot deals and irresistible offers starts here.
</p>

            </div>
          </form>
        </div>
        {/* Right Panel */}
        <div className="hidden sm:flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700 dark:from-gray-800 dark:via-blue-950 dark:to-blue-900 p-0">
          <div className="relative w-80 h-48 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-center items-center p-6" style={{background: 'linear-gradient(135deg, #232526 0%, #414345 100%)'}}>
            {/* Fancy Welcome Message */}
            <div className="flex flex-col items-center justify-center w-full h-full">
              <span className="text-3xl md:text-4xl font-extrabold tracking-wider mb-2 text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                Welcome to LootCart!
              </span>
              <span className="text-lg md:text-xl font-semibold text-center text-blue-200 dark:text-blue-300 italic drop-shadow-sm animate-fade-in">
                🚀⭐
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
