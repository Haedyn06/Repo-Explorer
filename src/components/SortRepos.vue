<template>
    <!-- Sort By -->
    <div class="sort-container">
        <h2>Sort By</h2>

        <div class="options-list">
            <label class="sort-option">
                <input 
                    type="radio" value="byRelevance" 
                    :checked="props.modelValue === 'byRelevance'" @change="changeSort" 
                />
                Relevance
            </label>

            <label class="sort-option">
                <input 
                    type="radio" value="byStar" 
                    :checked="props.modelValue === 'byStar'" @change="changeSort" 
                />
                Stars
            </label>

            <label class="sort-option">
                <input 
                    type="radio" value="byUpdate" 
                    :checked="props.modelValue === 'byUpdate'" @change="changeSort" 
                />                
                Updated
            </label>
        </div>

    </div>
</template>



<script setup>
    const props = defineProps({
        modelValue: { type: String, default: 'byRelevance' }
    });

    // Sends value to parent variable
    const send = defineEmits(['update:modelValue']);
    const changeSort = (val) => send('update:modelValue', val.target.value);
</script>


<style scoped>
    .sort-container {
        padding: 20px;
        border: 1px solid black;
        border-radius: 18px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
    }

    .sort-container h2 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        text-align: center;
    }

    .options-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }


    .sort-option {
        display: flex;
        align-items: center;
        gap: 0.6rem;

        padding: 0.6rem 0.8rem;
        border-radius: 10px;

        cursor: pointer;

        border: 1px solid #ddd;
        background: #fff;
    }


    .sort-option input {
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid #999;
        position: relative;
    }

    .sort-option input:checked {
        border-color: #3b82f6;
        background: #3b82f6;
    }

    .sort-option:hover {
        background: #f5f7fa;
        border-color: #bbb;
    }


    .sort-option:has(input:checked) {
        background: #eaf2ff;
        border-color: #3b82f6;
    }



    @media (max-width: 1000px) {
        .options-list {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }

        .sort-option {
            flex: 1 1 auto;
            justify-content: center;
            padding: 0.4rem 0.6rem;
            font-size: 0.9rem;
        }

        .sort-container {
            all: unset;
            width: 50%;
        }
    }
</style>