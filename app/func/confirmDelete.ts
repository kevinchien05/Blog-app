import Swal from "sweetalert2";

export const confirmDelete = async (func?: any): Promise<void> => {
    const isDark = document.documentElement.classList.contains('dark')
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You can't undo this.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        background: isDark ? '#1e1e1e' : '#fff',
        color: isDark ? '#fff' : '#000',
        confirmButtonColor: '#e02424',
        cancelButtonColor: "#060606ff",
        customClass: {
            container: 'swal2-topmost'
        }
    })

    if (result.isConfirmed) {
        if (typeof func === "function") {
            await func();
            await Swal.fire({
                title: 'Deleted!',
                text: 'Your item has been deleted.',
                icon: 'success',
                background: isDark ? '#1e1e1e' : '#fff',
                color: isDark ? '#fff' : '#000',
                confirmButtonColor: '#38bdf8',
                customClass: {
                    container: 'swal2-topmost'
                }
            })
        }
    }
}