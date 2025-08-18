import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Button variant="outline" size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="absolute md:top-5 md:right-5 top-2 right-2"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-white" />
        </Button>
    )
}