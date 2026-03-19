<template>
    <div class="filter-container">
        <h2>Filter By Language</h2>

        <select :value="props.modelValue" @change="changeLanguage" class="filter-option" >
            <option value="">All</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Java">Java</option>
            <option value="Rust">Rust</option>
            <option value="Bash">Bash</option>
            <option value="SQL">SQL</option>
            <option value="Go">Go</option>
            <option value="Swift">Swift</option>
            <option value="Kotlin">Kotlin</option>
        </select>
    </div>
</template>

<script setup>
    const props = defineProps({
        modelValue: { type: String, default: '' }
    });

    // Sends value to parent variable
    const send = defineEmits(['update:modelValue']);
    const changeLanguage = (val) => send('update:modelValue', val.target.value);
</script>

<style scoped>
    .filter-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 20px;
        border: 1px solid black;
        border-radius: 18px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        background: white;
    }

    .filter-container h2 {
        margin: 0;
        font-size: 1.5rem;
        text-align: center;
    }

    .filter-option {
        width: 100%;
        padding: 0.7rem 0.9rem;
        border: 1px solid #ccc;
        border-radius: 10px;
        outline: none;
        font-size: 0.95rem;
        box-sizing: border-box;
        background: white;
        cursor: pointer;
    }

    .filter-select:focus { border-color: #666; }


    @media (max-width: 1000px) {
        .filter-container { all: unset; }
        .filter-container h2{ padding-bottom: 10px; }



        
        .sort-option { 
            padding: 0.3rem 0.4rem; 
            font-size: 1rem;
        }
        .sort-container h2 { font-size: 1.2rem; }
    }

</style>