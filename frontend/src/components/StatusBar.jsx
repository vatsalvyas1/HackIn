export default function StatusBar() {
    return(
        <div className="mx-1 md:mx-16 pb-20">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-neutral-800 pt-20">
                <div class="text-center">
                    <p class="text-3xl md:text-4xl font-bold text-purple-500 mb-1">150+</p>
                    <p class="text-neutral-400 text-sm">Hackathons Listed</p>
                </div>
                <div class="text-center">
                    <p class="text-3xl md:text-4xl font-bold text-purple-500 mb-1">5,280</p>
                    <p class="text-neutral-400 text-sm">Teams Registered</p>
                </div>
                <div class="text-center">
                    <p class="text-3xl md:text-4xl font-bold text-purple-500 mb-1">10k+</p>
                    <p class="text-neutral-400 text-sm">Active Developers</p>
                </div>
                <div class="text-center">
                    <p class="text-3xl md:text-4xl font-bold text-purple-500 mb-1">98%</p>
                    <p class="text-neutral-400 text-sm">Found Better Teams</p>
                </div>
            </div>
        </div>
    )
}